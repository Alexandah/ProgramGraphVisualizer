import { AdditionalFees, Distributions, PassThroughFees } from "./transaction";

export default class ContributionModel {
    memberName: string;
    employerName: string;

    startBillingPeriod: Date;
    endBillingPeriod: Date;

    baseMonthlyContribution: number;
    medicalCostSharing: number;
    excessNeedsCommunitySharing: number;
    newMemberMedicalCostSharing: number;
    regularNeedsCommunitySharing: number;
    passThroughFees: PassThroughFees;
    additionalFees: AdditionalFees;
    discountAmount: number;
    distributions: Distributions;
    totalContribution: number;

    dateUpdate: Date;
    dateCreate: Date;

    id: string;
    memberId: string;
    employerId: string;
}

