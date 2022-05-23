using NetDimension.NanUI.Resource.Data;
using NetDimension.NanUI.Browser.ResourceHandler;
using System.Diagnostics;

namespace SimpleGameLibraryManager
{
    public class GameContentService : DataService
    {
        private int GetGamesCount()
        {
            return 114514;
        }
        public class GID
        {
            public int GameID { get; set; }
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
    }


}
