using NetDimension.NanUI;
using NetDimension.NanUI.HostWindow;
using NetDimension.NanUI.JavaScript;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using SimpleGameLibraryManager;

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
#if RELEASE
        Icon = new System.Drawing.Icon(@".\Libman\ico\gal.ico");
#else
        Icon = new System.Drawing.Icon(@"C:\Users\ASUS\source\repos\LibMang\Libman\ico\gal.ico");    
#endif

    }

    protected override void OnReady()
    {
        // 在此处进行浏览器相关操作

        //ShowDevTools();
        var obj = new JavaScriptObject();
        
        obj.Add("SelectGamePath", (args =>
        {
            string filePath = "";
            InvokeIfRequired(() =>
            {
                FolderBrowserDialog folder = new FolderBrowserDialog();
                folder.Description = "选择一个目录";
                if (folder.ShowDialog() == DialogResult.OK)
                {
                    filePath = folder.SelectedPath;
                }
                else
                {
                    filePath = "None";
                }
            });
            return new JavaScriptValue(filePath);
        }));
        obj.Add("OpenGame", (args =>
        {
            var gid = args.FirstOrDefault(x => x.IsString)?.GetString() ?? "";
            int key;
            if (!int.TryParse(gid, out key))
            {
                return new JavaScriptValue("游戏ID不正确");
            }
            Task task1 = new Task(() =>
            {
                if (BackGrounds.lib.ContainsKey(key))
                {
                    var path = BackGrounds.lib[key].m_execPath;
                    BackGrounds.lib[key].m_lastOpenedTime = DateTime.Now.ToString();
                    if (!BackGrounds.lib_recent.ContainsKey(key))
                    {
                        BackGrounds.lib_recent.Add(key, BackGrounds.lib[key]);
                    }
/*                    InvokeIfRequired(() =>
                    {*/
                    var StartTime = DateTime.Now;
                    var curRuntime = 0;
                    Process gp = new Process();
                    gp.StartInfo.FileName = path;
                    gp.StartInfo.WorkingDirectory = BackGrounds.lib[key].m_path;
                    gp.Start();
                    BackGrounds.lib[key].m_isOnline = true;
                    ExecuteJavaScript("window.location.reload()");
                    do
                    {
                        if (!gp.HasExited)
                        {
                            curRuntime = (DateTime.Now - StartTime).Minutes;
                        }
                    }
                    while (!gp.WaitForExit(60000));
                    BackGrounds.lib[key].m_time = BackGrounds.lib[key].m_time.HasValue ? BackGrounds.lib[key].m_time + curRuntime : curRuntime;
                    BackGrounds.lib[key].m_isOnline = false;
                    ExecuteJavaScript("window.location.reload()");

                    //});

                }       
            });
            task1.Start();
            return new JavaScriptValue(0);
        }));
        RegisterJavaScriptObject("natives", obj);
        //ExecuteJavaScript("alert('Hello NanUI')");
    }
}