import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { NoPostsComponent } from './components/no-posts/no-posts.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'no-posts', component: NoPostsComponent },
  // { path: '', redirectTo: '/no-posts', pathMatch: 'full' },
  { path: 'create', component: CreatePostComponent },
  { path: 'post/:id', component: PostDetailComponent},
  { path: 'edit/:id', component: EditPostComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
