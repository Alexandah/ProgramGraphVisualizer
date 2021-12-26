import DataLayer from "src/datalayer";


//--------------------------------------------------------------------------------------------------------------
export enum BarItemGroup {
    AccessPlus = 0,
    SelectPlus = 1,
    Other = 2,
}

//--------------------------------------------------------------------------------------------------------------
export enum BarItemId {
    Member,
    Invoice,
    Payment,
    Employer,
    Dashboard,
    Transaction,
    Contribution
}



//--------------------------------------------------------------------------------------------------------------
export default class BarItemModel {
    public constructor(
        fields?: {
            name?: string,
            id?: BarItemId,
            group: BarItemGroup,
        }) {
        if (fields) Object.assign(this, fields);
    }


    id: BarItemId = BarItemId.Dashboard;
    name: string = "Dashboard";
    group: BarItemGroup;
    favorite: boolean;          // This filter in favorite filters list for THIS user. Resolved by API
    count: number = 0;          // Number of results from DB that matches this filter. Resolved by dedicated API call after adding filter to the work area.
    countAge: number = -1;      // Number of hours since counter was recalculated on the server.
    isSelected: boolean = false; // When user adds filter to query builder this items turns true
    isLoading: boolean = false;

    definition: any;
    definitionFromServer: any;



    //----------------------------------------------------------------------------------------------------------
    static hasModificationToDefinition(f: BarItemModel): boolean {
        const d1 = JSON.stringify(f.definition);
        const d2 = JSON.stringify(f.definitionFromServer);

        return d1 && d2 && d1 !== d2;//&& ( props.filterInEdit.type != FilterType.Segmented && d1.length > 66))
    }

    //----------------------------------------------------------------------------------------------------------
    static formatCount(count: number): string {
        if (count == null)
            return;
        if (count === DataLayer.WIDGET_UpdatePending)
            return "pending"
        if (count === DataLayer.WIDGET_Disabled)
            return 'off';
        if (count === DataLayer.WIDGET_Failed)
            return 'fail';
        return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

