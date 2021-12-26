import BarItemModel from "./filter";
import DataLayer from "src/datalayer";
import { WidgetModel } from "src/part/widget";


export default class AppModel {
//    static defaultFilter = { "groupOp": "AND", "rules": [{ "field": "employerName", "op": "bw", "data": "" }] };
    static widgetDefault: WidgetModel[] = [
        { count: DataLayer.WIDGET_UpdatePending, title: "Statistics", green: "is", icon: "fo icon-cube", footer: "loading ..." } as WidgetModel,
        { count: DataLayer.WIDGET_UpdatePending, title: "Statistics", green: "is", icon: "fo icon-chart-pie", footer: "loading ..." } as WidgetModel,
        { count: DataLayer.WIDGET_UpdatePending, title: "Statistics", green: "is", icon: "fo icon-chart-bar", footer: "loading ..." } as WidgetModel,
        { count: DataLayer.WIDGET_UpdatePending, title: "Statistics", green: "is", icon: "fo icon-cubes", footer: "loading ..." } as WidgetModel
    ];

    static widgetErr = { count: DataLayer.WIDGET_Failed, title: "Statistics", green: "not", icon: "fo icon-flash", footer: "available now" } as WidgetModel;
    static widgetOff = { count: DataLayer.WIDGET_Disabled, title: "Statistics", green: "is", icon: "fo icon-off", footer: "disabled" } as WidgetModel;


    barItemList: BarItemModel[] = [];
    barItemCurr = new BarItemModel();
    isLoading: boolean = false;
    widgets: WidgetModel[] = AppModel.widgetDefault;

    selectView: (f: BarItemModel) => void;
    saveFilter: () => void;
    setIsLoading: (isLoading: boolean) => void;
    setDefinition: (q: {}) => void;
    setWidgets: (widgets: WidgetModel[]) => void;
}