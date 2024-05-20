import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { environment } from 'src/environments/environment';
import { NoPostsComponent } from './components/no-posts/no-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailComponent,
    NavbarComponent,
    FooterComponent,
    CreatePostComponent,
    EditPostComponent,
    NoPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
