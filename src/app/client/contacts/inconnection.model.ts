import { FuseUtils } from '@fuse/utils';

export class InConnection
{   
    id:string;
    search_id:string;
    ID2:string;
    in_account_id:string;
    import_type:string;
    status:string;
    date:string;
    campaign_id:string;
    ID1:string;
    publicIdentifier:string;
    notes:string;
    reminder:string;
    label:string; 
    

    /**
     * Constructor
     *
     * @param InConnection
     */
    constructor(InConnection)
    {
        {
            this.id = InConnection.id || FuseUtils.generateGUID();
            this.search_id = InConnection.search_id || '';
            this.ID2 = InConnection.ID2 || '';
            this.in_account_id = InConnection.in_account_id || '';
            this.import_type = InConnection.import_type || '';
            this.status = InConnection.status ||'';
            this.date = InConnection.date || '';
            this.campaign_id = InConnection.campaign_id || '';
            this.ID1 = InConnection.ID1 || '';
            this.publicIdentifier = InConnection.publicIdentifier || '';
            this.notes = InConnection.notes || '';
            this.reminder = InConnection.reminder || '';
            this.label = InConnection.label || '';            
            
        }
    }
}
