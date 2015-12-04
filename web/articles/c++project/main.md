# C++ 工程化学习笔记

> 学了了C++的语法之后就需要用起来，学校和一般的教材不会教我们怎么选择IDE，怎么和其他语言跨界合作，甚至第三方库的使用也只停留在了“在VS上怎么点”，但这些是非常重要的，没有这些就不可能工业化生产代码，所以此篇来记录 C++的工程化，放心不会很难，因为我也是个初学者。

## 调试工具

	sudo port install cgdb

(安装 cgbd)[http://stackoverflow.com/questions/25215695/installing-cgdb-on-a-mac-os-x]

(使用 cgbd 调试)[http://blog.csdn.net/delphiwcdj/article/details/46336411]

[gcc 命令](http://www.cnblogs.com/azraelly/archive/2012/07/07/2580839.html)

如本章开头提到的，Gcc的编译流程分为了四个步骤，分别为：

· 预处理（Pre-Processing）

· 编译（Compiling）

· 汇编（Assembling）

· 链接（Linking）

gcc 参数命令

-c   只是编译不链接，生成目标文件“.o”

-g   在可执行程序中包含标准调试信息

-o file     把输出文件输出到file里

-static     链接静态库

-llibrary   连接名为library的库文件

makefile 

[如何自己编写Makefile](http://www.cnblogs.com/luchen927/archive/2012/02/05/2339002.html)

mpi 的 makefile.me 文件是通过这个来管理的，
[ gnu/autotools](http://blog.csdn.net/scucj/article/details/6079052)

[MPICH2安装使用](http://www.cnblogs.com/lyq105/archive/2010/06/01/1749515.html)

对，可以学学makefile
究生  15:48:50
然后看看 cmake
究生  15:48:57
gdb调试
究生  15:49:13
再加个有高亮语法的编辑器
究生  15:49:16
基本ok了
究生  15:49:32
调试推荐用cgdb

C++ 的学习暂停吧，何时重开不确定。

原因：牵扯到的东西越来越多，不确定何时可以投入使用，所以决定停止投入，如果有实际需要或者有和做 C++ 开发的人共事的话在考虑开始。