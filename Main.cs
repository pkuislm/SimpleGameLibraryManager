using NetDimension.NanUI;

class Program
{
    static void Main()
    {
        // ...
        WinFormium.CreateRuntimeBuilder(env =>
        {

            env.CustomCefSettings(settings =>
            {
                // 在此处设置 CEF 的相关参数
            });

            env.CustomCefCommandLineArguments(commandLine =>
            {
                // 在此处指定 CEF 命令行参数
            });

        }, app =>
        {
            //use System.IO.Path.Combine(System.Windows.Forms.Application.StartupPath, "Libman") when release
            app.UseLocalFileResource("https", "static.app.local", @"C:\Users\ASUS\source\repos\LibMang\Libman", url =>
            {
                if (url.StartsWith("https://static.app.local/"))
                {
                    return "Main.html";
                }
                return null;
            });
            app.UseLocalFileResource("https", "static.app.local", @"C:\Users\ASUS\source\repos\LibMang\Libman");

            // Register DataServiceResource handler which can process http request and return data to response. It will find all DataServices in current assembly automatically or you can indicate where to find the DataServices by using the third parameter.
            // 注册数据资源控制器，它能处理前端的http请求并返回相应结果。DataServiceResource会自动扫描并注册程序集内的数据服务，您也可以手动指定数据服务所在的位置。
            //app.UseDataServiceResource("http", "api.app.local");

            // 指定启动窗体
            app.UseMainWindow(context => new MainWindow());
        })
        .Build()
        .Run();
    }
}