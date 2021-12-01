
export default interface IEvent {
    id: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    type: string;
    organizationId: number;
    createdAt: Date;
    updatedAt: Date;
    followingUsers: any[];
    organization: { id: number; name: string };
}