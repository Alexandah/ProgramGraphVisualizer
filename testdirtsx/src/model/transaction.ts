export default class TransactionModel {
    memberName: string;
    employerName: string;   
    
    startBillingPeriod: Date;
    endBillingPeriod: Date;
    id: string;

    transactionStartDate: Date;
    transactionEndDate: Date;
    transactionType: string;
    paymentType: string;

    totalContribution: number;
    baseContribution: number;
    medicalCostSharing: number;

    excessNeedsCommunitySharing: number;
    newMemberMedicalCostSharing: number;
    regularNeedsCommunitySharing: number;

    passThroughFees: PassThroughFees;
    additionalFees: AdditionalFees;
    discountAmount: number;

    distributions: Distributions;
    contributionFeeId: string;
    memberId: string;
    employerId: string;
}

export class PassThroughFees {
    BankingFee: number;
    PatientAdvocacy: number;
    SecondOpinion: number;
    Telemedicine: number;
}

export class AdditionalFees {
    TobaccoUse: number;
    MemberServices: number;
}

export class Distributions {
    TobaccoUseMCS: number;
}