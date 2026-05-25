/** binary flag that dictates what stroke type to use */
export enum DrawType {
    Stroke =  1 << 0, // flip byte at idx 0 to 1
    Fill = 1 << 1, // flip byte at idx 1 to 1
}

export enum Color {
    White = "#ffffff",
    Black = "#000000",
    Red = "#ff0000",
    Green = "#00ff00",
    Blue = "#0000ff",
    LightGray = "#d8d8d8"
}