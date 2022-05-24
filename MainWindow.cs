using NetDimension.NanUI;
using NetDimension.NanUI.HostWindow;

class MainWindow : Formium
{
    // 设置窗体样式类型
    public override HostWindowType WindowType => HostWindowType.System;
    // 指定启动 Url
    public override string StartUrl => "https://static.app.local/Main.html";

    public MainWindow()
    {
        // 在此处设置窗口样式
       
        Size = new System.Drawing.Size(1280, 720);
        EnableSplashScreen = false;
        Title = "SimpleGameLibraryManager";
        Icon = new System.Drawing.Icon(@"..\..\..\Libman\ico\gal.ico");
    }

    protected override void OnReady()
    {
        // 在此处进行浏览器相关操作

        ShowDevTools();
        //ExecuteJavaScript("alert('Hello NanUI')");
    }
}