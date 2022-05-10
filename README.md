# Annualized Weighted returns

This web app computes and returns the total returns of an investment portfolio, annualized and weighted according to the duration of each dollar in the investment account.

The formula for annualized returns is:

*where x is the current value of the portfolio*

*where y is the initial vlaue of the portfolio*

*where z is the the days which the portfolio has been held*

![Equation](https://math.vercel.app/?bgcolor=auto&from=%28x%2Fy%29%5E%7B365%2Fz%7D-1.svg)

The formula is modifed in twos ways:
- The initial value is the sum of the deposits made
- The days held is the average days in the portfolio of all dollars

It is not the simple average of all deposit dates, as larger deposit amounts will be weighted more greatly. This amount is:

*where K is the set of all deposits in the portfolio*

*where n is a given deposit in that set*

*where n<sub>x</sub> is the amount of days in between the current day and when the given deposit was made*

*where n<sub>y</sub> the amount of a given deposit*

*where Y is the sum all deposit amounts*

![Equation](https://math.vercel.app/?bgcolor=auto&from=%5Csum_%7Bn%20%5Cin%20K%7Dn_x%20%5Ctimes%20%28n_y%20%5Cdiv%20Y%29.svg)

