using NetDimension.NanUI.Resource.Data;
using NetDimension.NanUI.Browser.ResourceHandler;
using System.Diagnostics;
using System.Collections.Generic;

namespace SimpleGameLibraryManager
{
    public class GameContentService : DataService
    {
        private int GetGamesCount()
        {
            return 114514;
        }

        [RoutePost("GetContents")]
        public ResourceResponse GetIds(ResourceRequest request)
        {
            // 返回json
            return Json(new { success = true, num = GetGamesCount() });
        }

        [RoutePost("GetDetails")]
        public ResourceResponse GetGameDetails(ResourceRequest request)
        {
            var result = request.StringContent;

            Debug.WriteLine(result);
            return Json(new { success = true });
        }

        [RoutePost("AddSingleGame")]
        public ResourceResponse Add(ResourceRequest request)
        {
            var result = request.StringContent;

            GameInfo info = new GameInfo(result);
            info.ScanDir();
            BackGrounds.lib.Add(0, info);
            return Json(new { success = true });
        }
    }


}
