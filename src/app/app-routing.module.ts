import { AuthguardGuard } from './auth/authguard.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    
  },
  {
    path: 'createpost/:userkey',
    loadChildren: () => import('./createpost/createpost.module').then( m => m.CreatepostPageModule)
  },
  
  {
    path: 'profile/:userkey',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'auth/:userkey',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'editprofile/:userkey',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'comments/:id/:userkey',
    loadChildren: () => import('./comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'channelmessage',
    loadChildren: () => import('./channelmessage/channelmessage.module').then( m => m.ChannelmessagePageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'clickeduser/:key/:username/:loggeduserkey',
    loadChildren: () => import('./clickeduser/clickeduser.module').then( m => m.ClickeduserPageModule)
  },
  {
    path: 'createlayout/:id/:userkey',
    loadChildren: () => import('./createlayout/createlayout.module').then( m => m.CreatelayoutPageModule)
  },
  {
    path: 'townhallsection',
    loadChildren: () => import('./townhallsection/townhallsection.module').then( m => m.TownhallsectionPageModule)
  },
  {
    path: 'townhallsection/:id',
    loadChildren: () => import('./townhallsection/townhallsection.module').then( m => m.TownhallsectionPageModule)
  },
  {
    path: 'layout-comment',
    loadChildren: () => import('./layout-comment/layout-comment.module').then( m => m.LayoutCommentPageModule)
  },
  {
    path: 'town-hall-comment-page/:postid/:username',
    loadChildren: () => import('./town-hall-comment-page/town-hall-comment-page.module').then( m => m.TownHallCommentPagePageModule)
  },
  {
    path: 'user-list/:loggeduserkey',
    loadChildren: () => import('./user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'visit-user-profile/:userkey',
    loadChildren: () => import('./visit-user-profile/visit-user-profile.module').then( m => m.VisitUserProfilePageModule)
  },
  {
    path: 'blocked-user',
    loadChildren: () => import('./blocked-user/blocked-user.module').then( m => m.BlockedUserPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
