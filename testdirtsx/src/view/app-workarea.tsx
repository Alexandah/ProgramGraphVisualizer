import * as React from "react";
import * as toastr from "toastr";

import AppModel from "src/model/app";
import Spinner from "src/part/spinner";
import WidgetCount from "src/part/widget";
import { BarItemGroup, BarItemId } from "src/model/filter";
import EmployerCollectionView from "./employers";
import MemberCollectionView from "./members";
import AccessPlusTransactionsView from "src/view/access-plus/transactions";
import AccessPlusContributionsView from "./access-plus/contributions";
import AccessPlusInvoiceCollectionView from "./access-plus/invoice";
import AccessPlusPaymentCollectionView from "./access-plus/payment";
import SelectPlusTransactionsView from "./select-plus/transactions";
import SelectPlusContributionsView from "./select-plus/contributions";
import SelectPlusInvoiceCollectionView from "./select-plus/invoice";
import SelectPlusPaymentCollectionView from "./select-plus/payment";

export default function EditorWorkArea(props: AppModel) {
    const [mainItem, setMainItem] = React.useState<any>()

    React.useEffect(() => {
        props.setWidgets(AppModel.widgetDefault);
//        props.setDefinition(AppModel.defaultFilter);
        setMainItem(renderView());
    }, [props.barItemCurr.id, props.barItemCurr.group])

    function renderView() {
        switch (props.barItemCurr.group) {
            case BarItemGroup.AccessPlus:
                switch (props.barItemCurr.id) {
                    case BarItemId.Transaction:
                        return <AccessPlusTransactionsView {...props} />;
                    case BarItemId.Contribution:
                        return <AccessPlusContributionsView {...props} />;
                    case BarItemId.Invoice:
                        return <AccessPlusInvoiceCollectionView {...props} />;
                    // case BarItemId.Payment:
                    //     return <AccessPlusPaymentCollectionView {...props} />;
                }
            case BarItemGroup.SelectPlus:
                switch (props.barItemCurr.id) {
                    case BarItemId.Transaction:
                        return <SelectPlusTransactionsView {...props} />;
                    case BarItemId.Contribution:
                        return <SelectPlusContributionsView {...props} />;
                    case BarItemId.Invoice:
                        return <SelectPlusInvoiceCollectionView {...props} />;
                    // case BarItemId.Payment:
                    //     return <SelectPlusPaymentCollectionView {...props} />;
                }
            case BarItemGroup.Other:
                switch (props.barItemCurr.id) {
                    case BarItemId.Employer:
                        return <EmployerCollectionView {...props} />;
                    case BarItemId.Member:
                        return <MemberCollectionView {...props} />;
                }
            default:
                toastr.warning("This view is not yet implemented.", "Under Construction");
                return <></>;
        }
    }



    return <>
        <Spinner show={props.isLoading} marginTop='50%' />
        <div className="card-body" >
            <div className="row sl-count">
                <WidgetCount {...props.widgets[0]} />
                <WidgetCount {...props.widgets[1]} />
                <WidgetCount {...props.widgets[2]} />
                <WidgetCount {...props.widgets[3]} />
            </div>

            {mainItem}

            <br />
            <br />
            <br />
        </div >
    </>
}