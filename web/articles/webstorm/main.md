# WebStorm 使用文档

> 号称最好用的前端IDE，Windows 和 Mac 上各用了一段时间，感觉确实不错分享出来。版本上从8一直用到11，在设置上9到10有一次比较大的调整，下面的设置大部分是从10的使用中记录整理而来，也有一小部分来自于11的使用经验，但是不用做任何区分，因为他们是兼容的。WebStorm在下面简写为WS。

## 快捷键
下面介绍的快捷键和上面皮肤和快捷键风格的设置有关，如果你和我设置的不一样会有很大的不同。第一批给出的快捷键是10个，以后每批不多于5个，因为一般人的短暂记忆量是3-7个，我记快捷键的方式是每天开始编码先看一眼快捷键，但是不多看3-5个足够了，一天的编码中尽量去用一般两到三天就不用刻意去想了基本可以达到肌肉记忆的层度。

### 1 - 基本
**编辑窗口的常用操作**

- 撤销，Undo，
Win:Ctrl + Z; Mac:Com + Z
 
- 恢复，Redo，
Win:Ctrl + Shift + Z; Mac:Com + Shift + Z

- 查找，Find，
Win:Ctrl + F; Mac:Com + F

- 在某一文件夹下查找内容，Find in Path，
Win:Ctrl + Shift + F; Mac:Ctrl + Shift + F

- 替换，Replace，
Win:Ctrl + R; Mac:Com + R，

- 格式化代码，Reformat Code，
Win:Ctrl + Alt + L， Mac:Option + Com + L 

**对当前光标所在行 或者 选中部分做操作**

- 向下复制一行或一个代码块，Duplicate Line or Block，
Win:Ctrl + D; Mac: Com + D

- 剪切，Cut，
Win:Ctrl + X; Mac: Com + X

- 删除，Delete Line，
Win:Ctrl + Y; Mac: Com + Y，需要注意的是选中字符所在的行会被删掉

- 上下移动行，Move Line Up/Down，
Win:Alt + Shift + 上/下箭头;Mac:Option + Shift + 上/下箭头

- 上下移动代码块，Move Statement Up/Down，
Ctrl + Shift + 上/下箭头，大括号内的，块状注释等都是代码块，遇到代码块也会一次跳到上面。代码块的识别有时会和想象中的不一样，所以比较适合跨代码块移动单行

### 2 - 操作编辑窗体

- 关闭当前的编辑窗体，Close Active Tab，
Win:Ctrl + F4; Mac:Com + F4 或 Com + W

- 左右切换编辑窗体，Select Previous/Next Tab，
Win:Alt + 左右箭头; Mac:Ctrl + 左右箭头，但是这和Mac系统左右切屏的快捷键有冲突，另外左右切屏可以通过在触摸板上三指左右滑动来切屏，其实我平时也是这么用的，所以我禁用了系统切屏快捷键。禁用方式：系统偏好设置/快捷键/Mission Control/向左移动一个 space。

- 最大化编辑窗体(隐藏所有工具窗口)，Hide All Toll Windows
Win:Ctrl + Shift + F12; Mac:Com + Shift + F12，我超级喜欢的快捷方式，可以让我专注的写好当前代码块

### 3 -  光标移动

- 前后跳单词，Move Caret to Previous/Next Word
Win:Ctrl + 左右箭头; Mac:Option + 左右键

- 跳到行首行尾，Move Caret to Line Start/End
Win:Home/End; Mac:Com + 左右箭头，其实这是Mac系统的快捷键也补充到这里

- 在下一行书写，Start Next Line
Win:Shift + Enter; Mac:Shift + Enter，当你在一行的中间部分改完代码需要进行下一行书写时次快捷键可以一步到位。比移先将光标到行尾再Enter换行感觉要好得多，速度也快得多

- 在上一行书写，Start New Line Before Current，
Win:Ctrl + Alt + Enter; Mac:Option + Com + Enter

- 跳到指定行，
Win:Ctrl + G; Mac:Com + G

### 4 - 折叠代码

- 折叠当前代码块，Collapse，
Win:Ctrl + Num-; Mac:Com + Num-，Num-就是键盘顶部数字键旁边的减号

- 展开当前代码块，Expand，
Win:Ctrl + Num+; Mac:Com + Num+

- 折叠全部代码块，Collapse All，
Win:Ctrl + Shift + Num-; Mac:Com + Shift + Num-，这也是我超喜欢的一个快捷方式，如果代码写的规整，折叠起来可以看到代码的组织方式，在参考注释很容易找到对应的功能模块

- 展开全部代码块，Expand All，
Win:Ctrl + Shift + Num+; Mac:Com + Shift + Num+

### 5 - 选中

- 选中的超级扩展，Extend Selection，
Win:Ctrl + W; Mac:Ctrl + W，请原谅我给这个快捷键起这么夸张的称谓，因为这个快捷方式是我超级超级喜欢的一个，按一次选中一个单词，两次一行，三次一个代码块，太好用了！！
(Mac 下默认的快捷方式是 Com + W，但是其他IDE和浏览器这个快捷方式是关闭Tab页，为了统一将这个改一下)

- 重命名，Rename，
Win:Shift + F6; Mac:Shift + F6，这是一个有多张面孔的快捷键。在js代码中此快捷键是变量重命名，给变量起名真是一个费劲的事情，随着业务的变动变量名一定要跟着作调整，否则代码的寿命不好太长远；在html和css以及文档文件中，此快捷键重命名当前文件；在资源文件目录下，此快捷方式是给资源重命名，而且会智能同步引用。

### 6 - 粘贴

- 粘贴，Paste，
Win:Ctrl + V; Mac:Com + V，一个很普通的粘贴

- 从复制历史中粘贴，Paste form History，
Win:Ctrl + Shift + V; Mac:Com + Shift + V，我超级喜欢的功能，有了它就不用反复的复制了

### 7 - 文件

- 打开文件，File...
Win:Ctrl + Shift + N; Mac:Com + Shift + N

- 保存全部，Save All，
Win:Ctrl + S; Mac:Com + S

- 新建文件，New...
Win:Alt + N; Mac:Control + N，在当前文件同级或者选中的文件夹下

- 打开最近打开的文件，Recent Files，
Mac:Com + E，会给出一个最近打开的文件列表

- 复制文件路径，Copy Paths，
Mac: Com + Shift + C

### 8 - 面板之间的切换

- 打开/收起命令行面板，Terminal，
Mac: Option + F12

- 左边的文件栏，Send to Left, Project
Mac: Com + 1

### 9 - 单项

- 两行变一行，Join Lines，
Mac: Control + Shift + J

## 设置

### 1 - 基本设置

- 打开设置

Win:File/Settings， 快捷键: Ctrl + Alt + S    

Mac:WebStorm/Preferences， 快捷键: Com + ，

下面的配置默认都在“设置”中设置，不再多述。

- 皮肤

代码高亮是很必要的，个人喜欢配色柔和一点的皮肤，WS的皮肤设置分两层，第一层是大框架，第二层是编辑窗口。需要两个配合设置，不然可能出现外白里黑或者里黑外白这种诡异的界面。

第一层: Appearance & Behavior/Appearance ，在Theme下选风格，Win 和 Mac选项不一样，Win多一些，Darcula是都有的，Darcula偏黑色风格。两外建议把“Override default fonts”选中，个人认为Win下微软雅黑比较好，Mac下Baghdad字体比较好看，Size设置成14或16对眼睛好。

第二层：Editor/Colors & Fonts， 在Scheme选风格，个人同样喜欢Darcula这一风格，另外提醒一句只有把Scheme另存为自己的风格才可以修改其中的一些更详细的配置，详细配置的修改在下面第二批设置中作解释。

- 快捷键

KeyMap，可以选择快捷键整体的规则，支持了Visual Studio、Eclipse、NetBeans等IDE的快捷方式，个人建议Win下用Default，Mac下用Mac OS X。

在下面的搜索框可以搜索你想要的快捷键，跨系统或跨风格时想要找同一个快捷方式可以通过描述来查找。后面的放大镜可以通过快捷键查找描述。

下面的设置将快捷键分了组，Editor Action是编辑窗口中的快捷方式，Main menu是对文件、Tab、各种面板操作的快捷方式。

### 2 - 工程

- 在新窗口打开工程

webstorm的一个缺陷就是不能在一个IDE打开多个工程，这也是它快的一个代价。如果一定要多窗口那就多IDE那就设置一下吧：
Settings | Appearance & Behavior | System Settings | Project Opening | Open project in new window
在新窗口中打开webstorm

- 默认编码设置，Settings | Editor | File Encodings，IDE Encoding设置的是编辑器编辑的时候的时候按默认那种编码格式打开，Project Encoding设置的是新建一个项目此项目默认的编码格式，下面Default encoding for properties files设置上面选中的文件夹下新建文件时的默认编码格式。

### 3 - 代码格式

**代码长度参考线**

真的不建议把一行代码写的太长，嵌套太深也是要避免的，毕竟代码是给人看的，偶尔交给机器执行以下，所以代码的可读性非常重要。所以就有了代码长度参考线。在 Settings | Editor | General | Appearance 中 勾选Show right margin 考线出现，取消勾选参考线消失。参考线的位置其实是字符数量的体现，在 Settings | Editor | Code Style 中 Right Margin 中调整字符数量，个人建议120。

**CSS空行**

默认CSS格式化之后会在两个样式块间加空行，去掉此空行的配置，Settings | Editor | Code Style | CSS | Other，将 Blank lines between blocks' 的值设为 0。

**MD文档默认换行**

MD文档默认不换行，可以在左边行号的位置右击勾选"Use Soft Wraps"，这种方式每次都要设置，还有一种一劳永逸的设置方法，Settings | Editor | General | Use soft wraps in editor

### 4 - 代码模板

- 编辑新文件模板，Settings | Editor | File and Code Templates，
设置新建文件中的默认内容，也可以添加自己的格式模板

- 代码块模板，Settings | Editor | Live Templates，
代码块的模板，如果你写一个for循环还从左码到右那就太out了。定义模板的时候有几点注意：在最下面一行修改 applicable （适用范围），范围要尽量小，否则容易冲突；定义变量默认值的时候注意要加引号，否则手工输入必不可少；建议勾选 Reformat，这样就不用手动调整格式。

### 5 - 其他零碎

- 设置选中文字之后，点击双引号\单引号包围选中，Settings | Editor | General | Smart keys，勾选surround selection on type quote or brace 

- 识别自定义文件，默认情况下 .vm .template .tl 文件是不能进行高亮显示的，在 Settings | Editor | File Types 下选择文件类型，通过下面的小加号可以添加想要识别的文件。

- 无法输入中文标点：此问题是自定义 JDK 引起的，删除 /Applications/WebStorm.app/Contents/jre 文件夹可解决问题，因为此文件夹下有自定义 JDK 的信息，经测试没发现副作用，详情参考[https://youtrack.jetbrains.com/issue/IDEA-147358](https://youtrack.jetbrains.com/issue/IDEA-147358)

- 添加第三方库的语法提示: Settings | Languages & FrameWorks | Javascript | Libraries，注意需要添加未压缩的源码。

- 取消 Tab 自动转四个空格的设置: Settings | Editor | Code Style | Other File Types | Use tab character，在编写 makefile 之类的文件时需要 Tab，所以需要开启此功能。

## 支持正版

为什么支持就不说了，说说怎么支持。WebStorm 分三个版本企业版(For business and organizations)个人版(For individual customers)和学生版(Discounted and complimentary licenses)，三个版本功能上没有任何差别，根据自己的情况看着买吧，另外欢迎老板主动买单。如果老板不主动就自己买单吧，对于生产资料传统的方式是老板配置，但是在新的合作模式下可以自己协调配置，老板给工资买什么自己看着办是一种更高效的资源配置方式。

前两种版本又有两种授权方式:新手授权(New Subscription)，特价版授权(Special Price for Perpetual License Holders*)。如果你是第一次购买，那对不起了，只能花59$=376￥买一年了;如果以前购买过永久版那就简单了，35$=223￥两年，相当于六折买两年。之前买一年可以一年内随便升级，一年后不能升级但可以随便使用，今年不知道是不是这么个卖法了。个人认为不用每年都升级，如果硬件不升级新版的软件可能会更慢。

现在已经是 WebStorm 11 了，旧版本不是很好找(为了让人买新版把链接藏得够深得...)，现把旧版的下载地址贴出来就不用每年都升级了，尤其是那些有一点怀旧情结的童鞋们...

[WebStorm 10 下载](https://confluence.jetbrains.com/display/WI/Previous+WebStorm+Releases)

## 写在最后的牢骚

每天都在写代码，应该花点时间培养一下和IDE的感情，快捷方式，代码补全，插件，是几个重要考察的点。没有哪个IDE绝对的好，熟练使用是关键。业务代码写的快一点才有时间研究新的东西，不然就沦落到一个经验用三年这种悲催的境地了。快速的写代码也是一种不错的感觉。

## 声明

欢迎各方转载，但请注明出处：
[https://github.com/longze/cellar/blob/master/web/articles/webstorm/main.md](https://github.com/longze/cellar/blob/master/web/articles/webstorm/main.md)