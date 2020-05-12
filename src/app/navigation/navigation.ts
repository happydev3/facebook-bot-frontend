import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [  
    {
        id       : 'dashboard',
        title    : 'Dashobard',               
        type     : 'item',
        icon     : 'dashboard',
        url      : '/client/contacts',
    },
    {
        id       : 'downloads',
        title    : 'Downloads',       
        type     : 'item',
        icon     : 'arrow_downward',
        url: '/client/downloads'        
    },
    {
        id       : 'accounts',
        title    : 'Accounts',       
        type     : 'item',
        icon     : 'account_box',
        url: '/client/accounts'
       
    },
    {
        id       : 'analytics',
        title    : 'Analytics',       
        type     : 'item',
        icon     : 'graphic_eq',
        url      : '/client/analytics'       
    },
    {
        id       : 'settings',
        title    : 'Settings',       
        type     : 'collapsable',
        icon     : 'settings_applications',
        children : [
            {
                id        : 'integrate_email',
                title     : 'Integrate Email',
                type      : 'item',
                url       : '/client/smtp',
                // exactMatch: true
            },
            {
                id: 'email_template',
                title: 'Email Template',
                type: 'item',
                url: '/client/email-templates'

            }
        ]
    },
    
        
];
