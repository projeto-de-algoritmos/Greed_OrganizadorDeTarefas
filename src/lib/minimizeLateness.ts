export type Job = {
    id: string,
    duration: number,
    deadline: number,
    start: number,
    end: number,
    delay: number,
}

export function minimizeLateness(jobs: Job[], startTime = 0): void {
    jobs.sort((a, b) => a.deadline - b.deadline)

    let time = new Date().getTime()
    // let time = jobs[0].deadline - jobs[0].duration
    for (let i = 0; i < jobs.length; i++) {
        jobs[i].start = time
        jobs[i].end = time + jobs[i].duration
        time = jobs[i].end

        if (jobs[i].end > jobs[i].deadline)
            jobs[i].delay = jobs[i].end - jobs[i].deadline
        else
            jobs[i].delay = 0
    }

    // jobs.forEach(j => console.log(j.delay, j.id));
    console.log(jobs);
}