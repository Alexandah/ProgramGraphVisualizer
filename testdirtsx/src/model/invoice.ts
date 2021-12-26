export class InvoiceSubgrid {
    status: string;
    amount: number;
    company: string;
    id: string;
}

export default class InvoiceModel {
    employerName: string;
    startBillingPeriod: Date;
    fundingEndDate: Date;
    feeDistributionEndDate: Date;
    addOnDistributionEndDate: Date;
    status: string;
    paymentDate: Date;
    amount: number;
    paymentAmount: number;
    openBalance: number;
    openBalanceInc: number;
    memberName: string;
    productType: string;
    qb: string;
    qbCompanyName: string;
    qbDateSync: Date;
    employerId: string;
    memberId: string;
    id: string;
    subgrid: InvoiceSubgrid;
}

