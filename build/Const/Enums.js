/** binary flag that dictates what stroke type to use */
export var DrawType;
(function (DrawType) {
    DrawType[DrawType["Stroke"] = 1] = "Stroke";
    DrawType[DrawType["Fill"] = 2] = "Fill";
    DrawType[DrawType["Shadow"] = 4] = "Shadow";
    DrawType[DrawType["ThickStroke"] = 8] = "ThickStroke";
})(DrawType || (DrawType = {}));
export var DrawTextType;
(function (DrawTextType) {
    DrawTextType[DrawTextType["Stroke"] = 1] = "Stroke";
    DrawTextType[DrawTextType["Fill"] = 2] = "Fill";
})(DrawTextType || (DrawTextType = {}));
export var Color;
(function (Color) {
    Color["Transparent"] = "rgba(0,0,0,0)";
    Color["White"] = "#fffff1";
    Color["Black"] = "#000000";
    Color["Red"] = "#ff0000";
    Color["Green"] = "#00ff00";
    Color["Blue"] = "#0000ff";
    Color["LightGray"] = "#e5e5e5";
    Color["DarkGray"] = "#929292";
    Color["PoolTableGreen"] = "#06b69f";
    Color["Wood"] = "#BA8C63";
    Color["Wood1"] = "#7a5d44";
    Color["Wood2"] = "#4c3622";
    Color["HudBkgMain"] = "rgba(255, 255, 255, 0.7)";
    Color["HudBkgIndicator"] = "#00ff9d80";
    // Ball colors
    // S stands for solid and T means stripe
    // fyi if you add 8 to the number on a solid ball, the resulting stripe ball with that number will have the same color as that solid ball
    Color["BallS1T9"] = "#ffff00";
    Color["BallS2T10"] = "#0000fe";
    Color["BallS3T11"] = "#fe0000";
    Color["BallS4T12"] = "#bf00c0";
    Color["BallS5T13"] = "#ff7f00";
    Color["BallS6T14"] = "#01c000";
    Color["BallS7T15"] = "#bf0000";
})(Color || (Color = {}));
