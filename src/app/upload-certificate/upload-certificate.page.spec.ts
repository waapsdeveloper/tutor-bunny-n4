import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadCertificatePage } from './upload-certificate.page';

describe('UploadCertificatePage', () => {
  let component: UploadCertificatePage;
  let fixture: ComponentFixture<UploadCertificatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
