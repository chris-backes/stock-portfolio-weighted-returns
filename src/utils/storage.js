export function grabStorage() {
    let transactions = JSON.parse(localStorage.getItem('transactions'))
    if (transactions) {
        return transactions
    } else {
        return []
    }
}