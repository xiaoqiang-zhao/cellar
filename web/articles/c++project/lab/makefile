# ----------------------------------------------------------------
# This is a makefile which automatically updates itself, 
# using "$(CC) -MM -E" in linux.
# linliu 2011-04-25
# ----------------------------------------------------------------
# $* 不包括扩展名的目标文件名称
# $+ 所有依赖文件，以空格分开，有顺序，有重复
# $< 第一个依赖文件名称
# $? 所有依赖文件，修改日期比目标文件晚
# $@ 目标的完整名称
# $^ 所有不重复依赖文件，以空格分开
# $% 如果目标是归档成员，则该变量表示目标的归档成员名称。如目标为
#    mytarget.so(image.o)，则 $@ 为 mytarget.so, $% 为 image.o
# ----------------------------------------------------------------
###### common commands
CC = gcc
CFLAGS = -Wall -O2
CXX = g++
CXXFLAGS = -Wall -O2
RM = rm
###### targets and objects
OBJS = $(patsubst %.cpp, %.o, $(shell ls *.cpp))
EXEC = ksp

###### compiler rules
.PHONY: all clean

all: $(EXEC)

$(EXEC): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $@ $+

###### object file dependences
DEPS = $(patsubst %.o, %.dep, $(OBJS))

-include $(DEPS)

%.dep: %.cpp
	@rm -f $@; \
	$(CXX) $(CXXFLAGS) -MM -E $< > $@.$$$$; \
	sed 's,\($*\)\.o[ :]*,\1.o $@: ,g' < $@.$$$$ > $@; \
	rm -f $@.$$$$

clean:
	-rm -f $(EXEC) $(OBJS) $(DEPS)
