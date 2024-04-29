import { CanActivateFn, Router } from '@angular/router';
import { PostService } from '../../routes/news/post/services/post/post.service';
import { inject } from '@angular/core';
import { IAnnouncementPost } from '../../components/announcment-post/interfaces/i-announcement-post.interface';
import { UserService } from '../../services/user/user.service';
import { LoginService } from '../../services/login/login.service';
import { IUser } from '../../interfaces/i-user.interface';
import { combineLatest } from 'rxjs';

export const postIsActiveGuard: CanActivateFn = (route, state) => {
  const postService: PostService = inject(PostService);
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  return new Promise((res, rej) => {
    const id = route.queryParamMap.get('id');

    if (id) {
      combineLatest([
        loginService.getCurrentLoggedInUser(),
        postService.getPost(id),
      ]).subscribe({
        next: ([user, post]) => {

          console.log(user)
          if (!user) router.navigate(['/unauthorised']);
          if (user?.isAdmin) res(true);
          // if (post[0].postDate.seconds < new Date().getTime() / 1000)
          //   router.navigate(['/unauthorised']);
        },
        error: (error: any) => console.log('error', error),
      });
    }

  });
};
