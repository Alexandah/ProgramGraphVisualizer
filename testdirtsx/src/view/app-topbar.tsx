import * as React from "react";
import AppModel from "src/model/app";
import { SelectPlusTransactions, SelectPlusContribution, SelectPlusInvoice, SelectPlusPayment, Employers, Members, AccessPlusInvoice, AccessPlusContribution, AccessPlusTransactions, AccessPlusPayment } from "./app-sidebar";

export const EditorTopbar = (props: AppModel) => <div>
    <a className="d-block d-md-none text-center" data-toggle="collapse"
        href="#collapseTotToolbar" role="button" aria-expanded="false" aria-controls="collapseTotToolbar">
        Menu<i className="fo icon-down-dir-1" />
    </a>
    <div className="collapse" id="collapseTotToolbar">
        <ul className="list-group">

            <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed pw-sidebar-noborder">
                <small>ACCESS PLUS</small>
            </li>
            <AccessPlusContribution {...props} />
            <AccessPlusTransactions {...props} />
            <AccessPlusInvoice {...props} />
            {/*<AccessPlusPayment {...props} />*/}

            <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed pw-sidebar-noborder">
                <small>SELECT PLUS</small>
            </li>
            <SelectPlusContribution {...props} />
            <SelectPlusTransactions {...props} />
            <SelectPlusInvoice {...props} />
            {/*<SelectPlusPayment {...props} />*/}

            <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed pw-sidebar-noborder">
                <small>OTHER</small>
            </li>
            <Employers {...props} />
            <Members {...props} />
        </ul>
    </div>
</div>

