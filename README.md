# Annualized Weighted returns

This web app computes and returns the total returns of an investment portfolio, annualized and weighted according to the duration of each dollar in the investment account.

The formula for annualized returns is:

*where x is the current value of the portfolio*

*where y is the initial vlaue of the portfolio*

*where z is the the days which the portfolio has been held*

<img style="background-color: white; padding: 5px" src="https://render.githubusercontent.com/render/math?math=(x/y)^{365/z}-1">

The formula is modifed in two twos ways:
- The initial value is the sum of the deposits made
- The days held is the average days in the portfolio of all dollars

It is not the simple average of all deposit dates, as larger deposit amounts will be weighted more greatly. This amount is:

*where K is the set of all deposits in the portfolio*

*where n is a given deposit in that set*

*where x is the amount of days in between the current day and when the given deposit was made*

*where y the amount of a given deposit*

*where Y is the sum all deposit amounts*

<img style="background-color: white; padding: 5px" src="https://math.vercel.app?bgcolor=auto&from=\sum_{n \in K}x \times (y \div Y)" />