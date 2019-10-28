/**
 * Report function logging the given args in browser. Meant to be mocked during tests.
 * @param args
 */
export default function report(... args)
{
    console.log("REPORT", ... args);
}
