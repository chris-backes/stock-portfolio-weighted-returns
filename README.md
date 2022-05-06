# Annualized Weighted returns

The central aspect of this is that it computes and returns the total returns of an investment portfolio, annualized and weighted according to the duration of each dollar in the investment account.

The formula for annualized returns is:
*where x is the current value of the portfolio*
*where y is the initial vlaue of the portfolio*
*where z is the the days which the portfoio has been held*

<img style="background-color: white; padding: 5px" src="https://render.githubusercontent.com/render/math?math=(x/y)^{365/z}-1">

The formula is modifed in two twos ways:
- The initial value is the sum of the deposits made
- The Days held is the average days in the portfolio of all dollars

It is not the simple average of all deposits, as larger deposits will be weighted more greatly to compensate for the larger dollar amounts. This ammount is:
<!-- fix this img -->
<!-- <img style="background-color: white; padding: 5px" src="https://render.githubusercontent.com/render/math?math=\sum_{\forall i}{}"> -->
