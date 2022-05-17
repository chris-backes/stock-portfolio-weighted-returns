/**
 * 
 * @param {*} absoluteStart 
 * @param {*} spyWeightedReturnAnnualized 
 * @param {*} nasdaqWeightedReturnAnnualized 
 * @param {*} weightedReturn 
 * @returns {string}
 */

const assessment = (absoluteStart, spyWeightedReturnAnnualized, nasdaqWeightedReturnAnnualized, weightedReturn) => {
    //gets the investing period in years, will be compared against a period of five years
    const investingPeriod =
        (new Date(new Date().setDate(new Date().getDate() - 1)) -
            new Date(absoluteStart)) /
        (1000 * 3600 * 24 * 365); //converts the milliseconds to years with decimals
    if (
        Number.isNaN(spyWeightedReturnAnnualized) ||
        Number.isNaN(nasdaqWeightedReturnAnnualized)
    )
        return "We seem to be having some trouble with our API calls, so we can't make an assessment of your portfolio.";
    if (
        weightedReturn > spyWeightedReturnAnnualized &&
        weightedReturn > nasdaqWeightedReturnAnnualized
    ) {
        if (investingPeriod > 5) {
            return "It is rare that an investor can outperform the market for such a sustained period of time. Well done!";
        } else {
            return "This is a really great start. Keep up the good work.";
        }
    } else if (
        weightedReturn < spyWeightedReturnAnnualized &&
        weightedReturn < nasdaqWeightedReturnAnnualized
    ) {
        if (investingPeriod > 5) {
            return "You probably want to look at index investing or some sort of broad market approach. The time and effort spent on this is not warranted by your returns";
        } else {
            return "Might be too soon to tell. But so far, your money was better spent elsewhere";
        }
    } else {
        if (weightedReturn > spyWeightedReturnAnnualized) {
            return "You beat the S&P, but not the NASDAQ. Bit of a mixed bag.";
        } else {
            return "You beat the NASDAQ, but not the S&P. Bit of a mixed bag.";
        }
    }
};

export default assessment