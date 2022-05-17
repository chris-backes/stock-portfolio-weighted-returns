import { useEffect } from 'react'

function useEffectWrapper(timeStamp, sign, setFunc) {
    useEffect(() => {
        let apiUrl = `https://api.polygon.io/v2/aggs/ticker/${sign}/range/1/day/${timeStamp}/${timeStamp}?adjusted=true&sort=asc&limit=120&apiKey=YHMpZffc6SJ6Ph0zhL1gNQzSUzWYE0KG`;
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (res) {
                        setFunc(res.results[0].c ?? 0);
                    });
                } else {
                    console.log(
                        "could not find " + sign + " for " + timeStamp
                    );
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [timeStamp, sign, setFunc]);
}

export default useEffectWrapper