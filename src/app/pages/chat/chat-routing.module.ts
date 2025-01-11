import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { chatListResolver } from 'src/app/resolvers/chatList.resolver';

import { ChatPage } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage,
    resolve: {
      chats: chatListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
