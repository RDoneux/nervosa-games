import { CanActivateFn, Router } from '@angular/router';
import { PostService } from '../../routes/news/post/services/post/post.service';
import { inject } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { combineLatest } from 'rxjs';
import { debug } from '../../services/debug/debug';

export const postIsActiveGuard: CanActivateFn = (route, state) => {
  const postService: PostService = inject(PostService);
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  return new Promise((res) => {
    const id = route.queryParamMap.get('id');

    if (id) {
      combineLatest([
        loginService.getCurrentLoggedInUser(),
        postService.getPost(id),
      ]).subscribe({
        next: ([user, post]) => {
          if (user?.isAdmin) res(true);
          else if (post[0].postDate.seconds > new Date().getTime() / 1000)
            router.navigate(['/unauthorised']);
          else {
            res(true);
          }
        },
        error: (error: any) => debug('error')(error),
      });
    } else {
      res(true);
    }
  });
};
