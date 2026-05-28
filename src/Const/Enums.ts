/** binary flag that dictates what stroke type to use */
export enum DrawType { // because javascript stores numbers as 32 bit integers, im prety sure there is a max of 32 bitflags, since each flag needs its own bit. 
    Stroke =  1 << 0, // flip byte at idx 0 to 1
    Fill = 1 << 1, // flip byte at idx 1 to 1
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
    PoolTableGreen = Color.LightGray, //"#31B94D",
    Wood = Color.LightGray, //"#BA8C63",
}


