using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleGameLibraryManager
{
    public class BackGrounds
    {
        static public Dictionary<int, GameInfo> lib = new Dictionary<int, GameInfo>();
    }
    

    public class GameInfo
    {
        public string m_name { get; set; }
        public string? m_brand { get; set; }
        public string []? m_tags { get; set; }
        public string? m_description { get; set; }
        public long m_size { get; set; }
        public string m_path { get; set; }
        public long? m_time { get; set; }
        public long? m_lastOpenedTime { get; set; }
        public string? m_execPath { get; set; }

        public GameInfo(string path)
        {
            m_name = "";
            m_path = path;
            m_size = 0;
            ScanDir();
        }
        public int ScanDir()
        {
            m_size = GetDirectoryLength(m_path);
            string[] files = Directory.GetFiles(m_path, "*.", SearchOption.TopDirectoryOnly);
            if(files != null)
            {
                m_name = Path.GetFileName(files[0]);
            }
            else
            {
                m_name = "";
            }
            files = Directory.GetFiles(m_path, "*.exe", SearchOption.TopDirectoryOnly);
            if (files != null)
            {
                m_execPath = files[0];
            }
            else
            {
                m_execPath = "";
            }
            return 0;
        }

        static long GetDirectoryLength(string dirPath)
        {
            if (!Directory.Exists(dirPath))
                return 0;
            long len = 0;
            DirectoryInfo di = new DirectoryInfo(dirPath);
            foreach (FileInfo fi in di.GetFiles())
            {
                len += fi.Length;
            }
            DirectoryInfo[] dis = di.GetDirectories();
            if (dis.Length > 0)
            {
                for (int i = 0; i < dis.Length; i++)
                {
                    len += GetDirectoryLength(dis[i].FullName);
                }
            }
            return len;
        }
    }
}
