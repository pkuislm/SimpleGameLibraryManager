using NetDimension.NanUI.Resource.Data;
using NetDimension.NanUI.Browser.ResourceHandler;
using System.Diagnostics;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace SimpleGameLibraryManager
{
    public class GameContentService : DataService
    {
        [RoutePost("GetContents")]
        public ResourceResponse GetIds(ResourceRequest request)
        {
            // 返回json
            List<int> list = new List<int>(BackGrounds.lib.Keys);
            return Json(new { success = true, List = list });
        }

        [RoutePost("GetLast")]
        public ResourceResponse GetLIds(ResourceRequest request)
        {
            // 返回json
            List<int> list = new List<int>(BackGrounds.lib.Keys);
            return Json(new { success = true, List = list });
        }

        [RoutePost("GetDetails")]
        public ResourceResponse GetGameDetails(ResourceRequest request)
        {

            int key;
            if(!int.TryParse(request.StringContent, out key))
            {
                return Json(new { success = false, reason = "游戏ID不正确" });
            }
            if (!BackGrounds.lib.ContainsKey(key))
            {
                return Json(new { success = false, reason = "游戏ID不存在" });
            }
            return Json(new { success = true, Game = BackGrounds.lib[key]});
        }

        [RoutePost("AddSingleGame")]
        public ResourceResponse Add(ResourceRequest request)
        {
            var result = request.StringContent;

            GameInfo info = new GameInfo(result);
            info.ScanDir();
            if (BackGrounds.lib.ContainsKey(result.GetHashCode()))
            {
                return Json(new { success = false, reason = "游戏库中已经存在该游戏！" });
            }
            else
            {
                BackGrounds.lib.Add(result.GetHashCode(), info);
                return Json(new { success = true });
            }
                
        }
        [RoutePost("SetGameDir")]
        public ResourceResponse GetGDir(ResourceRequest request)
        {
            FolderBrowserDialog folder = new FolderBrowserDialog();
            folder.Description = "选择所有文件存放目录";
            folder.ShowDialog();
            var importpath = "";
            Task.Run(() =>
            {
                
                if (folder.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                {
                    string sPath = folder.SelectedPath;
                }

            }).GetAwaiter().GetResult();
            
            if (importpath != null) 
            { 
                return Json(new { success = true, path=importpath });
            }
            else
            {
                return Json(new { success = false });
            }
        }
    }


}
