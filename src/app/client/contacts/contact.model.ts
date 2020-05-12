import { FuseUtils } from '@fuse/utils';

export class Contact
{    
    ID1:string;
    ID2:string;
    name:string;
    occupation:string;
    picture:string;
    publicIdentifier:string;
    industry:string;
    location:string;
    title:string;
    company:string;
    formattedName:string;
    memberId:string;
    email:string;
    phone:string;
    website:string;
    date:string;
    notes:string;
    reminder:string;
    label:string

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.ID2 = contact.ID2 || FuseUtils.generateGUID();         
            this.name = contact.name || '';
            this.picture= contact.picture || 'assets/images/avatars/profile.jpg';
            this.publicIdentifier= contact.publicIdentifier || '';
            this.industry=contact.industry || '';
            this.location=contact.location || '';
            this.title=contact.title||'';
            this.company = contact.company || '';
            this.formattedName=contact.formattedName || '';
            this.memberId =contact.memberId || '';            
            this.email = contact.email || '';
            this.phone = contact.phone || '';
            this.website =contact.website ||'';
            this.date = contact.date ||'';                     
            this.notes = contact.notes || '';
            this.reminder = contact.reminder || '';
            this.label =contact.label || '';
            this.ID1 = contact.ID1 || '';
        }
    }
}
