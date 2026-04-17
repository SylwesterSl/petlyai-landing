export const trackClick = (event: string) => {
    console.log("TRACK:", event);

    fetch("/api/track", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: "click",
            event,
            timestamp: new Date().toISOString(),
        }),
    }).catch(() => { });
};