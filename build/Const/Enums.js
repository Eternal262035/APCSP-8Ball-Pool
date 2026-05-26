/** binary flag that dictates what stroke type to use */
export var DrawType;
(function (DrawType) {
    DrawType[DrawType["Stroke"] = 1] = "Stroke";
    DrawType[DrawType["Fill"] = 2] = "Fill";
    DrawType[DrawType["StrokeText"] = 4] = "StrokeText";
    DrawType[DrawType["FillText"] = 8] = "FillText";
    DrawType[DrawType["Image"] = 16] = "Image";
})(DrawType || (DrawType = {}));
export var Color;
(function (Color) {
    Color["Transparent"] = "rgba(0,0,0,0)";
    Color["White"] = "#ffffff";
    Color["Black"] = "#000000";
    Color["Red"] = "#ff0000";
    Color["Green"] = "#00ff00";
    Color["Blue"] = "#0000ff";
    Color["LightGray"] = "#e5e5e5";
})(Color || (Color = {}));
