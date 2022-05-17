export interface trainee {
    fname: string,
    lname: string
}

export interface order {
    meal_option_id: number
}

export interface lumpsum {
    trainee: trainee,
    orders: order[]
}