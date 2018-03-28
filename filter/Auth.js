import { Filter } from './Filter.js';

export class AuthFilter extends Filter {
    doFilter(context) {
        if(context.request.pathname === '/login') {
            this.chain();
            return;
        }
        let session = context.session;
        if(!session || !session.user || !session.user.id) {
            this.redirect('/login');
            return;
        }
    }

}
