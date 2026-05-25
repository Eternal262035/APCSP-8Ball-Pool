/** binary flag that dictates what stroke type to use */
export var DrawType;
(function (DrawType) {
    DrawType[DrawType["Stroke"] = 1] = "Stroke";
    DrawType[DrawType["Fill"] = 2] = "Fill";
})(DrawType || (DrawType = {}));
export var Color;
(function (Color) {
    Color["White"] = "#ffffff";
    Color["Black"] = "#000000";
    Color["Red"] = "#ff0000";
    Color["Green"] = "#00ff00";
    Color["Blue"] = "#0000ff";
    Color["LightGray"] = "#d8d8d8";
})(Color || (Color = {}));
