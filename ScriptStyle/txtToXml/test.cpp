// convert.cpp : Defines the entry point for the console application.
//


#include "iostream"
#include <fstream>
#include <sstream>
#include "string"
#define MAX 512
using namespace std;


int main(int argc, char* argv[])
{
	printf("Hello World!\n");

	fstream ofile;
	fstream ifile;
	//
	ifile.open("H:\\download\\google_download\\MINA-Chat-master\\Resource\\爱情公寓第六集(上).txt",ios::in);
	ofile.open("H:\\download\\google_download\\MINA-Chat-master\\Resource\\爱情公寓第六集(上)转.txt",ios::out);
	char buffer[MAX];
	int index=0;
	string sIndex;
	
	while(!ifile.eof()){
		ifile.getline(buffer,MAX);
		string str(buffer);


		string str2="<text>"+str+"</text>";
		ofile<<str2;
		index++;
		

	}


	ifile.close();
	ofile.close();




	return 0;
}




