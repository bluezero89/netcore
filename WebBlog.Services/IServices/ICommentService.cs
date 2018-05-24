﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebBlog.Database.Models;

namespace WebBlog.Services.IServices
{
    public interface ICommentService
    {
        bool CommentExists(int id);
        Task<Comment> GetByIdAsync(int id);
        Task CreateAsync(Comment comment);
        Task UpdateAsync(Comment comment);
        Task DeleteAsync(Comment comment);
        Task<IEnumerable<Comment>> GetAllAsync();
        Task<IEnumerable<Comment>> GetAllRemovedAsync();
    }
}
