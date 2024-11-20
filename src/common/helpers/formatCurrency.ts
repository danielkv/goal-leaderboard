const BRLFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

export function formatCurrency(amount: number): string {
    return BRLFormat.format(amount)
}
