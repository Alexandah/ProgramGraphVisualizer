import * as React from "react";
import * as toastr from "toastr";
import NavigationBarWithUser from "src/part/navbar-user";
import EditorSidebar from "./app-sidebar";
import BarItemModel, { BarItemGroup, BarItemId } from "src/model/filter";
import { EditorTopbar } from "src/view/app-topbar";
import AppModel from "src/model/app";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import Dashboard from "./dashboard";
import EditorWorkArea from 'src/view/app-workarea';
import AuthAPI from "src/api/auth";

class PageApp extends React.Component<RouteComponentProps, AppModel> {

    constructor(props: RouteComponentProps, state: AppModel) {
        super(props, state);
        this.state = this.declareNewState();
        this.rightNavBarAction = this.rightNavBarAction.bind(this);
    }

    declareNewState(): AppModel {
        let s = new AppModel();

        s.saveFilter = () => this.rightNavBarAction();
        s.setDefinition = (d: {}) => { this.state.barItemCurr.definition = d; this.setState({}) };
        s.setIsLoading = (v) => this.setState({ isLoading: v });
        s.setWidgets = (w) => this.setState({ widgets: w });
        s.selectView = (f: BarItemModel) => this.setState({ barItemCurr: f, isLoading: false })
        return s;
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        document.title = "Subledger";

        switch (this.props.location.pathname) {
            case "/accessPlus/contributions":
                this.state.selectView(new BarItemModel({
                    id: BarItemId.Contribution,
                    name: "Contributions (Access+)",
                    group: BarItemGroup.AccessPlus
                }))
                break;
            case "/accessPlus/invoices":
                this.state.selectView(new BarItemModel({
                    id: BarItemId.Invoice,
                    name: "Invoices (Access+)",
                    group: BarItemGroup.AccessPlus
                }))
                break;
            case "/accessPlus/transactions":
                this.state.selectView(new BarItemModel({
                    id: BarItemId.Transaction,
                    name: "Transactions (Access+)",
                    group: BarItemGroup.AccessPlus
                }))
                break;
            // case "/accessPlus/payments":
            //     this.state.selectView(new BarItemModel({
            //         id: BarItemId.Payment,
            //         name: "Payments (Access+)",
            //         group: BarItemGroup.AccessPlus
            //     }))
            //     break;
            case "/selectPlus/contributions":
                this.state.selectView(new BarItemModel({
                    id: BarItemId.Contribution,
                    name: "Contributions (Select+)",
                    group: BarItemGroup.SelectPlus
                }))
                break;
            case "/selectPlus/invoices":
                this.state.selectView(new BarItemModel({
                    id: BarItemId.Invoice,
                    name: "Invoices (Select+)",
                    group: BarItemGroup.SelectPlus
                }))
                break;
            case "/selectPlus/transactions":
                this.state.selectView(new BarItemModel({
                    id: BarItemId.Transaction,
                    name: "Transactions (Select+)",
                    group: BarItemGroup.SelectPlus
                }))
                break;
            // case "/selectPlus/payments":
            //     this.state.selectView(new BarItemModel({
            //         id: BarItemId.Payment,
            //         name: "Payments (Select+)",
            //         group: BarItemGroup.SelectPlus
            //     }))
            //     break;
            case "/employers":
                this.state.selectView(new BarItemModel({
                    id: BarItemId.Employer,
                    name: "Employers",
                    group: BarItemGroup.Other
                }))
                break;
            case "/members":
                this.state.selectView(new BarItemModel({
                    id: BarItemId.Member,
                    name: "Members",
                    group: BarItemGroup.Other
                }))
                break;
            default:
                toastr.warning("This view is not yet implemented.", "Under Construction");
                return <></>;
        }

    }

    rightNavBarAction() {
        event.preventDefault();
        this.setState({ isLoading: true });
        AuthAPI
            .logout()
            .then(() => this.props.history.push('/auth/login'));

    }


    render() {
        return <div>
            <div className="row no-gutters">
                <EditorSidebar {...this.state} />
                <div className="col-12 col-md-9 col-xl-10">
                    <NavigationBarWithUser title={this.state.barItemCurr.name}
                        leftButtonIcon=" "
                        letfButtonRedirectPage=""
                        leftButtonText="     "
                    />
                    <EditorTopbar {...this.state} />

                    {this.state.barItemCurr.id == BarItemId.Dashboard ? <Dashboard /> : <EditorWorkArea {...this.state} />}
                </div>
            </div>
        </div>
    }
}

export default withRouter(PageApp)
