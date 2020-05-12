import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import { ContactsService } from 'app/client/contacts/contacts.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector     : 'chat-view',
    templateUrl  : './chat-view.component.html',
    styleUrls    : ['./chat-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit
{
    user: any;
    chat: any;
    dialog: any;
    contact: any;
    replyInput: any;    
    inContact:any;
    inConnection: any;

    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     */
    constructor(
        private _contactsService: ContactsService,
        private _activatedRoute : ActivatedRoute,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._activatedRoute.params.subscribe(params => {
            if (params['ID2'] && (!this.inContact)) {                        
                 this._contactsService.getContactById(params['ID2']).then( res => {
                        this.inContact = res['in_contact'];
                        this.inConnection = res['in_connection'];
                        this.contact.name = this.inContact.firstName + ' ' + this.inContact.lastName;
                        if(this.inContact.picture){
                            this.contact.avatar = this.inContact.picture;
                        }
                        this._contactsService.getContactMessages(this.inConnection['in_account_id'],this.inContact['ID1']).then(res => {
                            this.dialog = this.validateMessageFormat(res['messages']);
                        });                                                       
                    }).catch( err => {
                });    
            }})        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
                
        this.contact = {  
            "id":"To",
            "name":"",
            "avatar":"assets/images/avatars/profile.jpg",            
         };
        this.dialog = [  
           
        ];
        this.readyToReply();
        this.user =  {
            'id'      : 'Me',
        };        
            
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Decide whether to show or not the contact's avatar in the message row
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    shouldShowContactAvatar(message, i): boolean
    {
        return (
            message.who === this.contact.id &&
            ((this.dialog[i + 1] && this.dialog[i + 1].who !== this.contact.id) || !this.dialog[i + 1])
        );
    }

    /**
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isFirstMessageOfGroup(message, i): boolean
    {
        return (i === 0 || this.dialog[i - 1] && this.dialog[i - 1].who !== message.who);
    }

    /**
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    validateMessageFormat(res){       
        var returnValue = [];
        for(var i in  res){
            var message = res[i];
            returnValue.push({
                "who": message.sender,
                "message":message.text,
                "time": new Date(message.createdAt)
            });
        }
        return returnValue;
    }
    isLastMessageOfGroup(message, i): boolean
    {
        return (i === this.dialog.length - 1 || this.dialog[i + 1] && this.dialog[i + 1].who !== message.who);
    }

    /**
     * Select contact
     */
    selectContact(): void
    {
        // this._chatService.selectContact(this.contact);
    }

    /**
     * Ready to reply
     */
    readyToReply(): void
    {
        setTimeout(() => {
            this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    /**
     * Focus to the reply input
     */
    focusReplyInput(): void
    {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    /**
     * Scroll to the bottom
     *
     * @param {number} speed
     */
    scrollToBottom(speed?: number): void
    {
        speed = speed || 400;
        if ( this.directiveScroll )
        {
            this.directiveScroll.update();

            setTimeout(() => {
                this.directiveScroll.scrollToBottom(0, speed);
            });
        }
    }

    /**
     * Reply
     */
    reply(event): void
    {
        event.preventDefault();

        if ( !this.replyForm.form.value.message )
        {
            return;
        }

        // Message
        const message = {
            who    : "Me",
            message: this.replyForm.form.value.message,
            time   : new Date().toISOString()
        };

        // Add the message to the chat
        this.dialog.push(message);

        // Reset the reply form
        this.replyForm.reset();

        // Update the server
        var data_message = {
            "id": this.inConnection['in_account_id'],
            "ID1": this.inContact['ID1'],
            "text": message.message,            
        }
        this._contactsService.sendContactMessage(data_message).then(response => {
            this.readyToReply();
        });
    }
}
