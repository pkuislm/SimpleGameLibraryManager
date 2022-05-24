using NetDimension.NanUI;
using NetDimension.NanUI.JavaScript;
using NetDimension.NanUI.JavaScript.WindowBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SimpleGameLibraryManager
{
    internal class CSObj : JavaScriptWindowBindingObject
    {
        public override string Name { get; } = "CSObjs";
        public override string JavaScriptCode { get; } = "";

        public CSObj()
        {
            RegisterHandler(Hello);
            RegisterHandler(HelloAsync);
        }

        // Register async method that need communicate with Formium object.
        private void HelloAsync(Formium owner, JavaScriptArray arguments, JavaScriptFunctionPromise callback)
        {
            var time = arguments.FirstOrDefault(x => x.IsNumber)?.GetInt() ?? 1000;
            var msg = arguments.FirstOrDefault(x => x.IsString)?.GetString() ?? "hello world";

            var function = arguments.FirstOrDefault(x => x.IsFunction);

            // 添加 Issues #251 的测试
            if (function != null)
            {
                ((JavaScriptFunction)function).ExecuteAsync();
            }


            Task.Run(async () =>
            {
                await Task.Delay(time);

                MessageBox.Show($"Delayed {time / 1000f} sec.");

                callback.Resovle(new JavaScriptValue(msg));
            });

        }

        // Register sync method that need communicate with Formium object.
        private JavaScriptValue Hello(Formium owner, JavaScriptArray arguments)
        {
            var msg = arguments.FirstOrDefault(x => x.IsString)?.GetString() ?? "hello world";

            owner.InvokeIfRequired(() => MessageBox.Show(owner.WindowHWND, msg, "Hello from JavaScript", MessageBoxButtons.OK, MessageBoxIcon.Information));

            return null;
        }

    }
}
