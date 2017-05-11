import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from './authentication.service';

@Directive({selector: '[appIfAuthenticated]'})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
	private authSubscription: Subscription;

	constructor(private authService: AuthenticationService,
	            private templateRef: TemplateRef<any>,
	            private viewContainer: ViewContainerRef) { }

	ngOnInit(): void {
		this.manageVisibility(this.authService.isAuthenticated());
		this.authSubscription = this.authService.onChange.subscribe((isAuthenticated: boolean) => {
			this.manageVisibility(isAuthenticated);
		});
	}

	private manageVisibility(isAuthenticated: boolean) {
		if (isAuthenticated) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		} else {
			this.viewContainer.clear();
		}
	}

	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}
}