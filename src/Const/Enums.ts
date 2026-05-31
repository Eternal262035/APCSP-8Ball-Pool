/** binary flag that dictates what stroke type to use */
export enum DrawType { // because javascript stores numbers as 32 bit integers, im prety sure there is a max of 32 bitflags, since each flag needs its own bit. 
    Stroke =  1 << 0, // flip byte at idx 0 to 1
    Fill = 1 << 1, // flip byte at idx 1 to 1
    Shadow = 1 << 2, // flip byte at idx 2 to 1 // shadow uses the fill color because lazy
}

export enum DrawTextType {
    Stroke = 1 << 0,
    Fill = 1 << 1,
}

export enum Color {
    Transparent = "rgba(0,0,0,0)",
    White = "#ffffff",
    Black = "#000000",
    Red = "#ff0000",
    Green = "#00ff00",
    Blue = "#0000ff",
    LightGray = "#e5e5e5",
    DarkGray = "#929292",
    PoolTableGreen = "#06b69f", //"#31B94D",
    Wood = "#BA8C63",

    // Ball colors
    // S stands for solid and T means stripe
    // fyi if you add 8 to the number on a solid ball, the resulting stripe ball with that number will have the same color as that solid ball
    BallS1T9 = "#ffff00",
    BallS2T10 = "#0000fe",
    BallS3T11 = "#fe0000",
    BallS4T12 = "#bf00c0", 
    BallS5T13 = "#ff7f00",
    BallS6T14 = "#01c000",
    BallS7T15 = "#bf0000",
}


