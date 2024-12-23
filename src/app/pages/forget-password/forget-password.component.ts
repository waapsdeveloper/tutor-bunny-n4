import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent extends BasePage implements OnInit {
  step = 'email';
  userId;
wrongOtp= false;
  formData: any = {
    email: null,
  };
  isButtonDisabled = true;
  receivedCode: string = '';

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    console.log("uiy");
  }

  getCodeBoxElement(index: number): HTMLInputElement {
    return <HTMLInputElement>document.getElementById('codeBox' + index);
  }

  back() {
    this.modals.dismiss();
  }

  result(value, key) {
    this.formData[key] = value;
  }

  async sendEmail() {
    if (!this.formData.email) {
      return;
    }
    let obj = {
      email: this.formData.email
    }

    let res = await this.network.sendEmail(obj);
    this.receivedCode = res.result.code;
    this.userId = res.result.user_id;
    this.step = "otp";
  }

  sendOTP() {
    const enteredCode = parseInt(this.getEnteredCode(), 10);
    const receivedCode = parseInt(this.receivedCode, 10);


    if (enteredCode === receivedCode) {
      this.step = "reset";
    } else {
      this.wrongOtp = true;
    }
  }


  getEnteredCode(): string {
    let code = '';
    for (let i = 1; i <= 4; i++) {
      code += this.getCodeBoxElement(i).value;
    }
    return code;
  }

  onKeyUpEvent(index: number, event: KeyboardEvent): void {
    const eventCode = event.which || event.keyCode;
    const currentElement = this.getCodeBoxElement(index);

    // Ensure the input value length does not exceed 1
    if (currentElement.value.length > 1) {
      currentElement.value = currentElement.value.slice(0, 1);
    }

    if (currentElement.value.length === 1) {
      if (index !== 4) {
        this.getCodeBoxElement(index + 1).focus();
      } else {
        currentElement.blur();
      }
    }

    if (eventCode === 8 && index !== 1) {
      this.getCodeBoxElement(index - 1).focus();
    }

    this.checkIfAllInputsFilled();
  }


  onFocusEvent(index: number): void {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getCodeBoxElement(item);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  checkIfAllInputsFilled(): void {
    let allFilled = true;
    for (let i = 1; i <= 4; i++) {
      if (!this.getCodeBoxElement(i).value) {
        allFilled = false;
        break;
      }
    }
    this.isButtonDisabled = !allFilled;
  }

  async submit() {
    if (!this.formData.password || !this.formData.confirm_password) {
      return
    }

    let obj = {
      user_id: this.userId,
      code: this.receivedCode,
      password: this.formData.password,
      confirm_password: this.formData.confirm_password
    }

    let res = await this.network.resetPassword(obj);
    this.modals.dismiss()


  }
}
