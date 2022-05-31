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
            List<int> list = new List<int>(BackGrounds.lib_recent.Keys);
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
            if(result != "None")
            {
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
            else
            {
                return Json(new { success = false, reason = "用户取消选择" });
            }
           
                
        }

        [RoutePost("RemoveSingleGame")]
        public ResourceResponse Rem(ResourceRequest request)
        {
            int key;
            if (!int.TryParse(request.StringContent, out key))
            {
                return Json(new { success = false, reason = "游戏ID不正确" });
            }
            if (!BackGrounds.lib.ContainsKey(key))
            {
                return Json(new { success = false, reason = "游戏ID不存在" });
            }
            if (BackGrounds.lib[key].m_isOnline)
            {
                return Json(new { success = false, reason = "游戏正在运行，请先结束游戏" });
            }
            BackGrounds.lib.Remove(key);
            if (BackGrounds.lib_recent.ContainsKey(key))
            {
                BackGrounds.lib_recent.Remove(key);
            }
            return Json(new { success = true });
        }
    }


}
