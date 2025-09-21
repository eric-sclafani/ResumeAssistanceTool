export default interface Job {
    jobId: number;
    title: string | null;
    description: string | null;
    skills: string[] | null;
    jobUrl: string | null;
}
